pipeline {
  agent {
    kubernetes {
        yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: nodejs
    image: femorao/pnpm:16.14
    env:
    - name: "npm_config_cache"
      value: /home/jenkins/.npm-cache
    command:
    - sleep
    args:
    - 9999999
    volumeMounts:
    - name: npm-cache-vol
      mountPath: /home/jenkins/.npm-cache
    - name: pnpm-vol
      mountPath: /home/jenkins/.pnpm
  - name: gitversion
    image: gittools/gitversion
    command:
    - sleep
    args:
    - 9999999
  restartPolicy: Never
  volumes:
  - name: npm-cache-vol
    persistentVolumeClaim:
      claimName: npm-cache-pvc
  - name: pnpm-vol
    persistentVolumeClaim:
      claimName: pnpm-pvc
        """
      }
    }

    parameters {
        booleanParam(name: 'DRY_RUN', defaultValue: false, description: '')
    }

    stages {
        stage('Version') {
          steps {
            withCredentials([string(credentialsId: 'discord-hook', variable: 'DISCORD_HOOK')]) {
                discordSend description: "Building branch: ${BRANCH_NAME}", footer: '', image: '', link: '', result: '', scmWebUrl: '', showChangeset: false, thumbnail: '', title: 'Build Started', webhookURL: DISCORD_HOOK
            }
            sh 'git branch -a | grep remotes | sed \'s/remotes\\/[^\\/]*\\///g\' | while read branch; do git checkout $branch; done'
            sh 'git checkout $BRANCH_NAME'
            container('gitversion') {
              configFileProvider([configFile(fileId: 'default-gitversion', targetLocation: 'GitVersion.yml')]) {
                sh "/tools/dotnet-gitversion"
                sh "/tools/dotnet-gitversion /output json /showvariable SemVer > ${WORKSPACE}/version"
              }
            }
          }
        }

        stage('Install') {
          steps {
            container('nodejs') {
              sh 'echo "store-dir=/home/jenkins/.pnpm" > .npmrc'
              sh "pnpm install"
            }
          }
        }

        stage('Build') {
          steps {
            container('nodejs') {
                sh "find ${WORKSPACE}/apps ${WORKSPACE}/libs -name package.json | sed s/package\\.json//g | while read package; do cd \$package; npm version --no-git-tag-version \$(cat ${WORKSPACE}/version); done"
                sh "pnpm build"
                sh "cp libs/web/package.json dist/libs/web"
                sh "sed -i s/moxy-js-version/\$(cat ${WORKSPACE}/version)/g dist/apps/cli/package.json"
                sh "ls -1a dist/*/*/package.json | sed s/package\\.json//g | while read package; do cp LICENSE \$package; done"
            }
          }
        }

        stage('Publish') {
          steps {
            container('nodejs') {
              withCredentials([string(credentialsId: 'npm-publish	', variable: 'NPM_TOKEN')]) {
                sh "npm config set '//registry.npmjs.org/:_authToken' \"\${NPM_TOKEN}\""
                script {
                  if(params.DRY_RUN == true) {
                    sh "ls -1a ${WORKSPACE}/dist/*/*/package.json | sed s/package\\.json//g | while read package; do cd \$package; npm publish --dry-run; done"
                  } else {
                    sh "ls -1a ${WORKSPACE}/dist/*/*/package.json | sed s/package\\.json//g | while read package; do cd \$package; npm publish --access public; done"
                  }
                }
              }
            }
          }
        }
    }

  post {
    always {
        withCredentials([string(credentialsId: 'discord-hook', variable: 'DISCORD_HOOK')]) {
            script {
                def SEMVER = readFile "${WORKSPACE}/version"
                def GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                discordSend description: "Build finished for branch: ${BRANCH_NAME}, version ${SEMVER}", footer: GIT_COMMIT_MSG, image: '', link: '', result: currentBuild.result, scmWebUrl: '', thumbnail: '', title: 'Build Finished', webhookURL: DISCORD_HOOK
            }
        }
    }
  }
}

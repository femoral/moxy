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
                sh "pnpm build"
                sh "cp libs/web/package.json dist/libs/web"
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
                    sh "ls -1a ${WORKSPACE}/dist/*/*/package.json | sed s/package\\.json//g | while read package; do cd \$package; npm version --no-git-tag-version \$(cat ${WORKSPACE}/version); npm publish --dry-run; done"
                  } else {
                    sh "ls -1a ${WORKSPACE}/dist/*/*/package.json | sed s/package\\.json//g | while read package; do cd \$package; npm version --no-git-tag-version \$(cat ${WORKSPACE}/version); npm publish --access public; done"
                  }
                }
              }
            }
          }
        }
    }
}

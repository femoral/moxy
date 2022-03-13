import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .ant-layout-content.site-layout-background{
    transition: ${(props) => props.theme.general.transition};
    background-color: ${(props) => props.theme.general.color.primary};
  }
  
  .ant-layout-header{
    transition: ${(props) => props.theme.general.transition};
    background-color: ${(props) => props.theme.general.color.secondary} !important;
  }
  
  .ant-page-header{
    &-heading-title{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text};
    }
    &-heading-sub-title{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.textSecondary};
    }
    &-back-button{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text};
    }
  }

  .ant-card{
    transition: ${(props) => props.theme.general.transition};
    border: 1px solid ${(props) => props.theme.general.color.border};
    &-head{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
      color: ${(props) => props.theme.general.color.text};
      border-radius: 0;
    }
    &-body{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
      color: ${(props) => props.theme.general.color.text};
      border-top: 1px solid ${(props) => props.theme.general.color.border};
    }
    &-actions{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
      color: ${(props) => props.theme.general.color.text};
      border-top: 1px solid ${(props) => props.theme.general.color.border};
      > li > span > .anticon{
        transition: ${(props) => props.theme.general.transition};
        color: ${(props) => props.theme.general.color.text};
      }
      > li:not(:last-child){
        transition: ${(props) => props.theme.general.transition};
        border-right: 1px solid ${(props) => props.theme.general.color.border};
      }
    }
  }
  
  .ant-empty-description{
    transition: ${(props) => props.theme.general.transition};
    color: ${(props) => props.theme.general.color.text};
  }
  
  .ant-input{
    transition: ${(props) => props.theme.general.transition};
    background-color: ${(props) => props.theme.general.color.primary};
    border-color: ${(props) => props.theme.general.color.border};
    color: ${(props) => props.theme.general.color.text};
    &-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input{
      background-color: ${(props) => props.theme.general.color.primary};
    }
  }
  
  .ant-pagination {
    &-item a {
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text}
    }

    &-item-active {
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.hover};
      border-radius: 50%;

      a {
        :hover {
          color: ${(props) => props.theme.general.color.text}
        }

        color: ${(props) => props.theme.general.color.text}
      }
    }

    &-prev button {
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text}
    }

    &-next button {
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text}
    }
  }
  
  .ant-drawer{
    &-header{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
      border-bottom: 1px solid ${(props) => props.theme.general.color.border};
      border-radius: 0;
    }
    &-close{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text}
    }
    &-title{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.text}
    }
    &-body{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
    }
    &-footer{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.secondary};
      border-top: 1px solid ${(props) => props.theme.general.color.border};
      border-radius: 0;
    }
  }
  
  .ant-form{
    &-item{
      &-required{
        transition: ${(props) => props.theme.general.transition};
        color: ${(props) => props.theme.general.color.text} !important;
      }
    }
    &-vertical .ant-form-item-label > label{
      color: ${(props) => props.theme.general.color.text} ;
    }
  }

  .ant-checkbox-wrapper{
    color: ${(props) => props.theme.general.color.text} ;
  }
  
  .ant-table{
    &-thead{
      > tr > th{
        transition: ${(props) => props.theme.general.transition};
        color: ${(props) => props.theme.general.color.text};
        background: ${(props) => props.theme.general.color.secondary};
        border-bottom: 1px solid ${(props) => props.theme.general.color.border};
      }
      > tr:first-child th:first-child{
        border-top-left-radius: 0;
      }
    }
    &-tbody{
      transition: ${(props) => props.theme.general.transition};
      background: ${(props) => props.theme.general.color.secondary};
      > tr.ant-table-row:hover > td{
        transition: ${(props) => props.theme.general.transition};
        background: ${(props) => props.theme.general.color.hoverSecondary} !important;
      }
      > tr > td{
        transition: ${(props) => props.theme.general.transition};
        border-bottom: 1px solid ${(props) => props.theme.general.color.border};
      }
    }

    &-placeholder{
      display: none;
    }
  }
  
  .ant-typography{
    transition: ${(props) => props.theme.general.transition};
    color: ${(props) => props.theme.general.color.text};
    &-secondary{
      transition: ${(props) => props.theme.general.transition};
      color: ${(props) => props.theme.general.color.textSecondary} !important;
    }
  }
  
  .ant-switch{
    :focus{
      box-shadow:  0 0 2px transparent;
    }
    &-checked:focus{
      box-shadow:  0 0 2px transparent;
    }
  }
  
  .ant-select{
    &-selector{
      transition: ${(props) => props.theme.general.transition};
      background-color: ${(props) => props.theme.general.color.primary} !important;
      border-color: ${(props) => props.theme.general.color.border} !important;
      color: ${(props) => props.theme.general.color.text}; 
    }
    &-arrow{
      color: ${(props) => props.theme.general.color.textSecondary} !important;
    }
  }
  
  .ant-input-group-addon{
    background-color: ${(props) => props.theme.general.color.button} ;
    color: ${(props) => props.theme.general.color.text};
    border: 1px solid ${(props) => props.theme.general.color.border};
  }
  
  .ant-radio-button{
    &-checked{
      border: 1px solid ${(props) => props.theme.general.color.border};
      color: ${(props) => props.theme.general.color.text} !important;
      background-color: ${(props) => props.theme.general.color.button};
    }
    &-wrapper{
      border: 1px solid ${(props) => props.theme.general.color.border};
      color: ${(props) => props.theme.general.color.text};
      background-color: ${(props) => props.theme.general.color.buttonSecondary};
      &-checked:not(.ant-radio-button-wrapper-disabled){
        color: ${(props) => props.theme.general.color.text};
        :active{
          color: ${(props) => props.theme.general.color.text};
        }
        :hover{
          color: ${(props) => props.theme.general.color.text};
        }
        :not(.ant-radio-button-wrapper-disabled):focus-within{
          box-shadow: none !important;
        }
      }
    }
  }

  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover{
    background-color: ${(props) => props.theme.general.color.primary} !important;
  }
`;

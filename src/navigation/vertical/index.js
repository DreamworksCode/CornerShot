// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Production information',
      icon: HomeOutline,
      path: '/'
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      sectionTitle: 'ROPING'
    },
    // {
    //   title: 'Roping Information',
    //   icon: AlertCircleOutline,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    {
      title: 'Roping Information',
      icon: AlertCircleOutline,
      path: '/Roping'
    },
    {
      title: 'Enter Roping',
      icon: FormatLetterCase,
      path: '/EnterRoping',
      // openInNewTab: true
    },
    {
      title: 'Enter Times',
      icon: Login,
      path: '/enterTimes',
      // openInNewTab: true
    },
    {
      title: 'Contestant Information',
      icon: CubeOutline,
      path: '/contestant_information'
    },
    {
      title: 'Tools & Reports',
      path: '/reports',
      icon: GoogleCirclesExtended
    }
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation

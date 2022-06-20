
import Logo from './Logo.svelte'
import Title from './Title.svelte'
import Main from './Main.svelte'
import Footer from './Footer.svelte'
import ClusterSelector from './ClusterSelector.svelte'
// const app = new App({
//   target: document.getElementById('app')
// })

const component0 = new Title({ target: document.querySelector("#title") });
const component1 = new Logo({ target: document.querySelector("#logo") });
const component2 = new Main({ target: document.querySelector("#main") });
const component3 = new Footer({ target: document.querySelector("#footer") });
const component4 = new ClusterSelector({ target: document.querySelector("#clusterSelector") });


export default app

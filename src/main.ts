
import Logo from './Logo.svelte';
import Title from './Title.svelte';
import Main from './Main.svelte';
import Footer from './Footer.svelte';
import ClusterSelector from './ClusterSelector.svelte';
import Menu from './Menu.svelte';
import Loading from './Loading.svelte';
import Sjabloon from './Sjabloon.svelte';
// const app = new App({
//   target: document.getElementById('app')
// })

const component0 = new Title({ target: document.querySelector("#title") });
const component1 = new Logo({ target: document.querySelector("#logo") });
const component2 = new Main({ target: document.querySelector("#main") });
const component3 = new Footer({ target: document.querySelector("#footer") });
const component4 = new ClusterSelector({ target: document.querySelector("#clusterSelector") });
const component5 = new Menu({ target: document.querySelector("#menu") });
const component6 = new Loading({ target: document.querySelector("#loading") });
const component7 = new Sjabloon({ target: document.querySelector("#sjabloon") });


export default app

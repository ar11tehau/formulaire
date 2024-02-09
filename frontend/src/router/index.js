import { createRouter, createWebHistory } from 'vue-router'
import MyForm from "/src/views/MyForm.vue"
import Recap from "/src/views/Recap.vue"
import TicketDetail from "/src/components/TicketDetail.vue"
import Signin from "/src/views/Signin.vue"
import { checkIsAuthenticated } from "/src/use/useTickets.mjs"

const routes = [
  {
    path: '/',
    name: "Login",
    component: Signin,
  },
  {
    path: '/form',
    name: "form",
    component: MyForm,
  },
  {
    path: '/tickets',
    component: () => import("/src/views/Tickets.vue"),
    children: [
      {
        path: ':ticketId',
        name: 'ticketDetail',
        component: TicketDetail,
        props: true,
      },
    ],
  },
  {
    path: '/recap/:ticketId',
    component: Recap,
    props: (route) => ({ ticketId : parseInt(route.params.ticketId) }),
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = await checkIsAuthenticated()
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    
    return { name: 'Login' }
  }
})

export default router
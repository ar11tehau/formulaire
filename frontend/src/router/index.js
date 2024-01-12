import { createRouter, createWebHistory } from 'vue-router'
import MyForm from "/src/views/MyForm.vue"
import Recap from "/src/views/Recap.vue"
import TicketDetail from "/src/components/TicketDetail.vue"

const routes = [
  {
    path: '/',
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

export default router
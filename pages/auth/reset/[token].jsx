import Footer from "@/components/Footer"
import Header from "@/components/Header/Header"
import ResetPage from "@/components/User/ResetPage"
import jwt from "jsonwebtoken"
import { getSession } from "next-auth/react"

const Reset = ({ userId }) => {
  return (
    <>
      <Header />
      <main className="w-full h-auto bg-slate-100">
        <ResetPage userId={userId} />
      </main>
      <Footer />
    </>
  )
}

export default Reset

export const getServerSideProps = async context => {
  const { query, req } = context

  const session = await getSession({ req })
  console.log("req : ", req)
  if (session) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const token = query.token
  const user_id = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET)

  return {
    props: {
      userId: user_id.id
    }
  }
}

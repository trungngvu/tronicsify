import ShippingPage from "@/components/checkoutPage/ShippingPage"
import Layout from "@/components/profile/layout/Layout"
import User from "@/models/User"
import db from "@/utils/db"
import { getSession } from "next-auth/react"
import { useState } from "react"

const Address = ({ user, tab, addressData }) => {
  const [addresses, setAddresses] = useState(user?.address.address)
  return (
    <>
      <Layout user={user.user} tab={tab} title={`Sổ địa chỉ`}>
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold">Sổ địa chỉ</h2>
        </div>
        <ShippingPage
          user={user}
          addresses={addresses}
          setAddresses={setAddresses}
          profile={true}
        />
      </Layout>
    </>
  )
}

export default Address

export async function getServerSideProps(context) {
  await db.connectDb()
  const { query } = context
  const session = await getSession(context)
  const user = session?.user
  const tab = query.tab || 0

  if (!session) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }
  const addressData = await User.findById(user?.id)
    .select("address")
    .lean()
  return {
    props: {
      user: {
        user: user,
        address: JSON.parse(JSON.stringify(addressData))
      },
      tab
    }
  }
}

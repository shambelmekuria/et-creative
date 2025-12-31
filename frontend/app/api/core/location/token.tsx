import { cookies } from 'next/headers'
 
export default async function getAccessToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access-token')?.value
  return token
}
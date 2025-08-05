import { auth, currentUser } from '@clerk/nextjs/server'

/**
 * Check if the current user is authorized as an admin
 * Returns true only if the user's email matches ADMIN_USER_EMAIL
 */
export async function isAuthorizedAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      console.log('🔒 No userId found in auth')
      return false
    }

    // Get the authorized admin email from environment
    const adminEmail = process.env.ADMIN_USER_EMAIL
    if (!adminEmail) {
      console.error('🔒 ADMIN_USER_EMAIL not configured')
      return false
    }

    console.log('🔒 Checking admin auth for userId:', userId)
    console.log('🔒 Expected admin email:', adminEmail)

    // Get user details using currentUser helper
    const user = await currentUser()
    if (!user) {
      console.log('🔒 No current user found')
      return false
    }

    const userEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress

    console.log('🔒 User email from Clerk:', userEmail)
    console.log('🔒 Primary email ID:', user.primaryEmailAddressId)
    console.log('🔒 All email addresses:', user.emailAddresses.map(e => ({ id: e.id, emailAddress: e.emailAddress })))

    if (!userEmail) {
      console.log('🔒 No primary email found for user')
      return false
    }

    // Check if user email matches admin email
    const isAdmin = userEmail.toLowerCase() === adminEmail.toLowerCase()
    
    console.log('🔒 Email comparison:', {
      userEmail: userEmail.toLowerCase(),
      adminEmail: adminEmail.toLowerCase(),
      match: isAdmin
    })
    
    if (!isAdmin) {
      console.log(`🔒 Access denied for user: ${userEmail}. Admin email: ${adminEmail}`)
    } else {
      console.log('🔒 ✅ Admin access granted!')
    }

    return isAdmin
  } catch (error) {
    console.error('🔒 ❌ Error checking admin authorization:', error)
    return false
  }
}

/**
 * Middleware helper to check admin access and return appropriate response
 */
export async function requireAdminAuth() {
  const isAdmin = await isAuthorizedAdmin()
  
  if (!isAdmin) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Admin access required' }), 
      { 
        status: 403, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
  
  return null // No error, user is authorized
}
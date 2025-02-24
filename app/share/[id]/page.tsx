// import { type Metadata } from 'next'
// import { notFound } from 'next/navigation'

// import { formatDate } from '@/lib/utils'
// import { getSharedChat } from '@/app/actions'
// import { ChatList } from '@/components/chat-list'
// import { FooterText } from '@/components/footer'

// export const runtime = 'edge'
// export const preferredRegion = 'home'

// // Define the interface for SharePageProps with params as Promise
// interface SharePageProps {
//   params: Promise<{
//     id: string; // Ensuring that 'id' is treated as a string
//   }>
// }

// export async function generateMetadata({
//   params
// }: SharePageProps): Promise<Metadata> {
//   const resolvedParams = await params; // Await the params Promise resolution
//   const chat = await getSharedChat(resolvedParams.id)

//   return {
//     title: chat?.title.slice(0, 50) ?? 'Chat'
//   }
// }

// export default async function SharePage({ params }: SharePageProps) {
//   const resolvedParams = await params; // Await the params Promise resolution
//   const chat = await getSharedChat(resolvedParams.id)

//   if (!chat || !chat?.sharePath) {
//     notFound()
//   }

//   return (
//     <>
//       <div className="flex-1 space-y-6">
//         <div className="px-4 py-6 border-b bg-background md:px-6 md:py-8">
//           <div className="max-w-2xl mx-auto md:px-6">
//             <div className="space-y-1 md:-mx-8">
//               <h1 className="text-2xl font-bold">{chat.title}</h1>
//               <div className="text-sm text-muted-foreground">
//                 {formatDate(chat.createdAt)} · {chat.messages.length} messages
//               </div>
//             </div>
//           </div>
//         </div>
//         <ChatList messages={chat.messages} />
//       </div>
//       <FooterText className="py-8" />
//     </>
//   )
// }




import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatDate } from '@/lib/utils'
import { getSharedChat } from '@/app/actions'
import { ChatList } from '@/components/chat-list'
import { FooterText } from '@/components/footer'

export const runtime = 'edge'
export const preferredRegion = 'home'

// ✅ Fix: Ensure params is a plain object
interface SharePageProps {
  params: { id: string } // ✅ No Promise<>
}

export async function generateMetadata({
  params
}: SharePageProps): Promise<Metadata> {
  const chat = await getSharedChat(params.id) // ✅ params is a plain object

  return {
    title: chat?.title.slice(0, 50) ?? 'Chat'
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id) // ✅ No need to await params

  if (!chat || !chat?.sharePath) {
    notFound()
  }

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="px-4 py-6 border-b bg-background md:px-6 md:py-8">
          <div className="max-w-2xl mx-auto md:px-6">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1>
              <div className="text-sm text-muted-foreground">
                {formatDate(chat.createdAt)} · {chat.messages.length} messages
              </div>
            </div>
          </div>
        </div>
        <ChatList messages={chat.messages} />
      </div>
      <FooterText className="py-8" />
    </>
  )
}

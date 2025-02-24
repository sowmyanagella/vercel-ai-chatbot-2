/*import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { cookies } from 'next/headers'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface ChatPageProps {
  params: Record<string, string>
}
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}*/


import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { cookies } from 'next/headers'

export const runtime = 'edge'
export const preferredRegion = 'home'

// Define the interface for ChatPageProps, using string for id
export interface ChatPageProps {
  params: Promise<{
    id: string; // Using string for id
  }>
}

// Generate metadata for the page
export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    return {}
  }

  const resolvedParams = await params; // Wait for params Promise resolution
  const chat = await getChat(resolvedParams.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

// Main component for the chat page
export default async function ChatPage({ params }: ChatPageProps) {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    const resolvedParams = await params; // Wait for params Promise resolution
    redirect(`/sign-in?next=/chat/${resolvedParams.id}`)
  }

  const resolvedParams = await params; // Wait for params Promise resolution
  const chat = await getChat(resolvedParams.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}


'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'
import { ArrowUpRight, Clock, Eye, ThumbsUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface Post {
  id: number
  postID: string
  title: string
  date: string
  excerpt: string
  tags: string
  image: string
  content: string
  estimated_read_time: string
  likes: number
  page_views: number
}

export function ImprovedBlogCardComponent({ post }: { post: Post }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseOver = () => setIsHovered(true)
  const handleMouseOut = () => setIsHovered(false)

  return (
    <Card 
      className="w-full transition-all duration-300 hover:shadow-lg"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link href={post?.postID?.toString() || "/allposts"} prefetch={true}>
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white line-clamp-2">{post.title}</h2>
              <p className="text-sm text-gray-200 mt-1">{formatDate(post.date)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags)).map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.estimated_read_time}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated read time</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.page_views}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Page views</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Likes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Link>
      {isHovered && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg transition-opacity duration-300">
          <ArrowUpRight className="w-4 h-4" />
          <span className="sr-only">View post</span>
        </div>
      )}
    </Card>
  )
}
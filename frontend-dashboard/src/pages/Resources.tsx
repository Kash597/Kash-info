import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface Resource {
  id: string
  title: string
  description: string
  type: 'course' | 'tool' | 'template' | 'guide'
  category: string
  author: string
  url?: string
  isPremium: boolean
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'AI Prompt Engineering Masterclass',
    description: 'Learn advanced techniques for crafting effective prompts for ChatGPT, Claude, and other LLMs.',
    type: 'course',
    category: 'AI',
    author: 'KASH_INFO Team',
    isPremium: true,
  },
  {
    id: '2',
    title: 'Productivity Dashboard Template',
    description: 'Notion template for tracking goals, tasks, and daily habits with AI integration.',
    type: 'template',
    category: 'Productivity',
    author: 'Sarah Johnson',
    url: '#',
    isPremium: false,
  },
  {
    id: '3',
    title: 'ChatGPT Custom Instructions Library',
    description: 'Collection of 50+ custom instructions to personalize your ChatGPT experience.',
    type: 'guide',
    category: 'AI',
    author: 'Mike Chen',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Midjourney Prompt Generator',
    description: 'Web tool to generate creative prompts for Midjourney image generation.',
    type: 'tool',
    category: 'Design',
    author: 'KASH_INFO Team',
    url: '#',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Building AI-Powered SaaS Apps',
    description: 'Complete course on integrating OpenAI and Anthropic APIs into your web applications.',
    type: 'course',
    category: 'Development',
    author: 'Alex Rodriguez',
    isPremium: true,
  },
  {
    id: '6',
    title: 'Marketing Email Templates (AI-Generated)',
    description: '30 proven email templates optimized for conversions, generated and refined with AI.',
    type: 'template',
    category: 'Marketing',
    author: 'Emily Davis',
    isPremium: false,
  },
  {
    id: '7',
    title: 'Complete Guide to AI Tools 2025',
    description: 'Comprehensive guide covering 100+ AI tools across different categories.',
    type: 'guide',
    category: 'AI',
    author: 'KASH_INFO Team',
    isPremium: false,
  },
  {
    id: '8',
    title: 'SEO Content Optimization Tool',
    description: 'AI-powered tool to analyze and optimize your content for search engines.',
    type: 'tool',
    category: 'Marketing',
    author: 'David Thompson',
    url: '#',
    isPremium: true,
  },
]

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeType, setActiveType] = useState<string>('all')

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = activeType === 'all' || resource.type === activeType

    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '📚'
      case 'tool':
        return '🛠️'
      case 'template':
        return '📋'
      case 'guide':
        return '📖'
      default:
        return '📄'
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
        <p className="text-muted-foreground">
          Access curated courses, tools, templates, and guides from industry experts
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Type Filter Tabs */}
      <Tabs value={activeType} onValueChange={setActiveType} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="course">Courses</TabsTrigger>
          <TabsTrigger value="tool">Tools</TabsTrigger>
          <TabsTrigger value="template">Templates</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{mockResources.filter(r => r.type === 'course').length}</p>
            <p className="text-sm text-muted-foreground">Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{mockResources.filter(r => r.type === 'tool').length}</p>
            <p className="text-sm text-muted-foreground">Tools</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{mockResources.filter(r => r.type === 'template').length}</p>
            <p className="text-sm text-muted-foreground">Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{mockResources.filter(r => r.type === 'guide').length}</p>
            <p className="text-sm text-muted-foreground">Guides</p>
          </CardContent>
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                {resource.isPremium && (
                  <Badge variant="default">Premium</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary">{resource.category}</Badge>
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    by {resource.author}
                  </p>
                  <Button size="sm">
                    {resource.url ? 'Open' : 'View'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">
            No resources found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Call to Action */}
      <Card className="mt-12 bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Need Something Specific?</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            Can't find what you're looking for? Suggest a resource or request custom content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Request Resource</Button>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from "react";
import { Users, MessageSquare, Calendar, Plus, Shield, BarChart3, Settings } from "lucide-react";
import { CosmicCard, CosmicCardContent, CosmicCardHeader, CosmicCardTitle, CosmicCardDescription } from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  user: {
    name: string;
    role: 'admin' | 'mentor' | 'junior';
    profilePic: string;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("communities");

  // Mock data
  const communities = [
    { id: 1, name: "Computer Science Hub", members: 245, description: "Discussion and resources for CS students", isJoined: true },
    { id: 2, name: "Engineering Excellence", members: 189, description: "Engineering projects and collaboration", isJoined: false },
    { id: 3, name: "Business Minds", members: 156, description: "Business strategies and entrepreneurship", isJoined: true },
    { id: 4, name: "Design Collective", members: 134, description: "UI/UX and graphic design community", isJoined: false },
  ];

  const clubs = [
    { id: 1, name: "Coding Warriors", members: 67, description: "Competitive programming and hackathons", type: "Technical" },
    { id: 2, name: "Debate Society", members: 43, description: "Improve your argumentation skills", type: "Literary" },
    { id: 3, name: "Photography Club", members: 58, description: "Capture memories and learn techniques", type: "Creative" },
    { id: 4, name: "Fitness Squad", members: 92, description: "Stay healthy and motivated together", type: "Sports" },
  ];

  const chatRooms = [
    { id: 1, name: "General Discussion", online: 23, lastMessage: "Hey everyone! How's your project going?", time: "2m ago" },
    { id: 2, name: "Study Group - DSA", online: 15, lastMessage: "Can someone help with this algorithm?", time: "5m ago" },
    { id: 3, name: "Internship Tips", online: 31, lastMessage: "Just got selected at Google! AMA", time: "12m ago" },
    { id: 4, name: "Campus Events", online: 8, lastMessage: "Tech fest registration starts tomorrow", time: "1h ago" },
  ];

  const tabs = [
    { id: "communities", label: "Communities", icon: <Users className="w-4 h-4" /> },
    { id: "clubs", label: "Clubs", icon: <Calendar className="w-4 h-4" /> },
    { id: "chats", label: "Chat Rooms", icon: <MessageSquare className="w-4 h-4" /> },
    ...(user.role === 'admin' ? [{ id: "admin", label: "Admin", icon: <Shield className="w-4 h-4" /> }] : []),
  ];

  const renderCommunities = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community, index) => (
        <CosmicCard key={community.id} className="group hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
          <CosmicCardHeader>
            <div className="flex items-center justify-between">
              <CosmicCardTitle className="text-lg">{community.name}</CosmicCardTitle>
              <Badge variant={community.isJoined ? "default" : "outline"}>
                {community.isJoined ? "Joined" : "Available"}
              </Badge>
            </div>
            <CosmicCardDescription>{community.description}</CosmicCardDescription>
          </CosmicCardHeader>
          <CosmicCardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                {community.members} members
              </span>
              <CosmicButton size="sm" variant={community.isJoined ? "outline" : "default"}>
                {community.isJoined ? "View" : "Join"}
              </CosmicButton>
            </div>
          </CosmicCardContent>
        </CosmicCard>
      ))}
    </div>
  );

  const renderClubs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clubs.map((club, index) => (
        <CosmicCard key={club.id} className="group hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
          <CosmicCardHeader>
            <div className="flex items-center justify-between">
              <CosmicCardTitle className="text-lg">{club.name}</CosmicCardTitle>
              <Badge variant="secondary">{club.type}</Badge>
            </div>
            <CosmicCardDescription>{club.description}</CosmicCardDescription>
          </CosmicCardHeader>
          <CosmicCardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                {club.members} members
              </span>
              <CosmicButton size="sm">Join Club</CosmicButton>
            </div>
          </CosmicCardContent>
        </CosmicCard>
      ))}
      
      {/* Create Club Card (for juniors) */}
      {user.role === 'junior' && (
        <CosmicCard className="border-dashed border-2 border-primary/50 hover:border-primary cursor-pointer group">
          <CosmicCardContent className="flex flex-col items-center justify-center py-12">
            <Plus className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors mb-4" />
            <CosmicCardTitle className="text-lg mb-2">Create Your Club</CosmicCardTitle>
            <CosmicCardDescription className="text-center">
              As a junior, you can create one club and invite others to join
            </CosmicCardDescription>
            <CosmicButton className="mt-4" size="sm">
              Create Club
            </CosmicButton>
          </CosmicCardContent>
        </CosmicCard>
      )}
    </div>
  );

  const renderChatRooms = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {chatRooms.map((room, index) => (
        <CosmicCard key={room.id} className="group hover:scale-105 cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
          <CosmicCardHeader>
            <div className="flex items-center justify-between">
              <CosmicCardTitle className="text-lg">{room.name}</CosmicCardTitle>
              <div className="flex items-center gap-1 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{room.online} online</span>
              </div>
            </div>
          </CosmicCardHeader>
          <CosmicCardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{room.lastMessage}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{room.time}</span>
                <CosmicButton size="sm">Join Chat</CosmicButton>
              </div>
            </div>
          </CosmicCardContent>
        </CosmicCard>
      ))}
    </div>
  );

  const renderAdminPanel = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CosmicCard>
          <CosmicCardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </CosmicCardContent>
        </CosmicCard>
        <CosmicCard>
          <CosmicCardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Chats</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <MessageSquare className="w-8 h-8 text-primary" />
          </CosmicCardContent>
        </CosmicCard>
        <CosmicCard>
          <CosmicCardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Flagged Posts</p>
              <p className="text-2xl font-bold text-destructive">3</p>
            </div>
            <Shield className="w-8 h-8 text-destructive" />
          </CosmicCardContent>
        </CosmicCard>
        <CosmicCard>
          <CosmicCardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Communities</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary" />
          </CosmicCardContent>
        </CosmicCard>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CosmicCard className="cursor-pointer hover:scale-105">
          <CosmicCardHeader>
            <CosmicCardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Community
            </CosmicCardTitle>
            <CosmicCardDescription>
              Create a new community for users to join
            </CosmicCardDescription>
          </CosmicCardHeader>
        </CosmicCard>

        <CosmicCard className="cursor-pointer hover:scale-105">
          <CosmicCardHeader>
            <CosmicCardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Moderation Panel
            </CosmicCardTitle>
            <CosmicCardDescription>
              Review flagged content and manage reports
            </CosmicCardDescription>
          </CosmicCardHeader>
        </CosmicCard>

        <CosmicCard className="cursor-pointer hover:scale-105">
          <CosmicCardHeader>
            <CosmicCardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Platform Settings
            </CosmicCardTitle>
            <CosmicCardDescription>
              Configure platform-wide settings and features
            </CosmicCardDescription>
          </CosmicCardHeader>
        </CosmicCard>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {" "}
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              {user.name}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {user.role === 'admin' && "Manage your platform and community"}
            {user.role === 'mentor' && "Connect with students and share knowledge"}
            {user.role === 'junior' && "Explore communities and find mentors"}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <CosmicButton
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              {tab.icon}
              {tab.label}
            </CosmicButton>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === "communities" && renderCommunities()}
          {activeTab === "clubs" && renderClubs()}
          {activeTab === "chats" && renderChatRooms()}
          {activeTab === "admin" && user.role === 'admin' && renderAdminPanel()}
        </div>
      </div>
    </section>
  );
}
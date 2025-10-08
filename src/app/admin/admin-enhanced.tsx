'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  AlertCircle,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { PageTransition, FadeIn, StaggerChildren } from '@/components/animations/PageTransitions';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { cn } from '@/lib/utils';

interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const stats: DashboardStat[] = [
  {
    label: 'Total Users',
    value: '12,543',
    change: '+12.5%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    label: 'Total Businesses',
    value: '3,847',
    change: '+8.2%',
    trend: 'up',
    icon: <Building2 className="w-6 h-6" />,
    color: 'bg-purple-500'
  },
  {
    label: 'Pending Reviews',
    value: '156',
    change: '-5.1%',
    trend: 'down',
    icon: <Clock className="w-6 h-6" />,
    color: 'bg-yellow-500'
  },
  {
    label: 'Reported Issues',
    value: '23',
    change: '+3.4%',
    trend: 'up',
    icon: <AlertCircle className="w-6 h-6" />,
    color: 'bg-red-500'
  }
];

const pendingBusinesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    submittedBy: 'Sarah Johnson',
    category: 'Restaurant',
    submittedDate: '2024-01-15',
    safetyScore: 95,
    status: 'pending'
  },
  {
    id: '2',
    name: 'Inclusive Gym',
    submittedBy: 'Mike Chen',
    category: 'Fitness',
    submittedDate: '2024-01-14',
    safetyScore: 92,
    status: 'pending'
  },
  {
    id: '3',
    name: 'Safe Space Library',
    submittedBy: 'Alex Rivera',
    category: 'Education',
    submittedDate: '2024-01-13',
    safetyScore: 98,
    status: 'pending'
  }
];

const recentUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    joined: '2024-01-10',
    reviews: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joined: '2024-01-09',
    reviews: 8,
    status: 'active'
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <FadeIn>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Manage users, businesses, and content
                  </p>
                </div>
                <Button variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn('p-3 rounded-lg', stat.color)}>
                        <div className="text-white">{stat.icon}</div>
                      </div>
                      <Badge
                        variant={stat.trend === 'up' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </StaggerChildren>

          {/* Tabs Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="businesses">
                Pending Businesses
                <Badge variant="warning" size="sm" className="ml-2">
                  {pendingBusinesses.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              New business submitted
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                              U{i}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                User {i}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {25 - i * 3} contributions
                              </p>
                            </div>
                          </div>
                          <Badge variant="primary" size="sm">
                            #{i}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pending Businesses Tab */}
            <TabsContent value="businesses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pending Business Submissions</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={pendingBusinesses}
                    columns={[
                      {
                        key: 'name',
                        label: 'Business Name',
                        sortable: true
                      },
                      {
                        key: 'category',
                        label: 'Category',
                        sortable: true
                      },
                      {
                        key: 'submittedBy',
                        label: 'Submitted By',
                        sortable: true
                      },
                      {
                        key: 'submittedDate',
                        label: 'Date',
                        sortable: true
                      },
                      {
                        key: 'safetyScore',
                        label: 'Safety Score',
                        sortable: true,
                        render: (value) => (
                          <Badge variant={value >= 90 ? 'success' : 'warning'}>
                            {value}
                          </Badge>
                        )
                      },
                      {
                        key: 'actions',
                        label: 'Actions',
                        render: () => (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        )
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={recentUsers}
                    columns={[
                      {
                        key: 'name',
                        label: 'Name',
                        sortable: true
                      },
                      {
                        key: 'email',
                        label: 'Email',
                        sortable: true
                      },
                      {
                        key: 'joined',
                        label: 'Joined',
                        sortable: true
                      },
                      {
                        key: 'reviews',
                        label: 'Reviews',
                        sortable: true
                      },
                      {
                        key: 'status',
                        label: 'Status',
                        render: (value) => (
                          <Badge variant={value === 'active' ? 'success' : 'default'}>
                            {value}
                          </Badge>
                        )
                      },
                      {
                        key: 'actions',
                        label: 'Actions',
                        render: () => (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        )
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reported Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No reported content</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

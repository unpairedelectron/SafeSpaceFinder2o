'use client';

import React, { useState } from 'react';
import {
  Bell,
  Check,
  Heart,
  MessageSquare,
  Shield,
  Star,
  Award,
  AlertCircle,
  TrendingUp,
  X,
  Settings,
  Filter,
  CheckCheck,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PageTransition, FadeIn, StaggerChildren } from '@/components/animations/PageTransitions';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Avatar from '@/components/ui/Avatar';

interface Notification {
  id: string;
  type: 'review' | 'safety' | 'community' | 'achievement' | 'update';
  title: string;
  message: string;
  businessName?: string;
  businessId?: string;
  userName?: string;
  userAvatar?: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'safety',
    title: 'Safety Score Update',
    message: 'Rainbow Café safety score increased to 95 - Community members reported improved accessibility',
    businessName: 'Rainbow Café',
    businessId: '1',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'community',
    title: 'New Review Response',
    message: 'The business owner responded to your review',
    businessName: 'Inclusive Gym',
    businessId: '2',
    userName: 'Alex Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    timestamp: '5 hours ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked! 🎉',
    message: 'You earned the "Community Helper" badge for 10 helpful reviews',
    timestamp: '1 day ago',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'review',
    title: 'Someone found your review helpful',
    message: '5 people found your review of Safe Space Library helpful',
    businessName: 'Safe Space Library',
    businessId: '3',
    timestamp: '2 days ago',
    read: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'update',
    title: 'New Feature Available',
    message: 'Try our new accessibility filter to find spaces that meet your specific needs',
    timestamp: '3 days ago',
    read: true,
    priority: 'medium'
  },
  {
    id: '6',
    type: 'safety',
    title: 'Safety Alert',
    message: 'A business near you reported accessibility improvements',
    businessName: 'Downtown Library',
    businessId: '4',
    timestamp: '4 days ago',
    read: true,
    priority: 'medium'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'safety':
      return Shield;
    case 'review':
      return MessageSquare;
    case 'community':
      return Heart;
    case 'achievement':
      return Award;
    case 'update':
      return TrendingUp;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'safety':
      return 'bg-blue-100 text-blue-600';
    case 'review':
      return 'bg-purple-100 text-purple-600';
    case 'community':
      return 'bg-pink-100 text-pink-600';
    case 'achievement':
      return 'bg-yellow-100 text-yellow-600';
    case 'update':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getPriorityBadge = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return { variant: 'danger' as const, label: 'Important' };
    case 'medium':
      return { variant: 'warning' as const, label: 'Medium' };
    case 'low':
      return { variant: 'default' as const, label: 'Low' };
  }
};

export default function NotificationsEnhanced() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedNotifications.has(n.id)));
    setSelectedNotifications(new Set());
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedNotifications(new Set(filteredNotifications.map((n) => n.id)));
  };

  const deselectAll = () => {
    setSelectedNotifications(new Set());
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <FadeIn>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-gray-600 mt-1">
                    {unreadCount > 0 ? (
                      <span className="font-medium text-purple-600">
                        {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                      </span>
                    ) : (
                      'You're all caught up!'
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedNotifications.size > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={deleteSelected}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete ({selectedNotifications.size})
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark all read
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    <Badge variant="outline" size="sm" className="ml-2">
                      {notifications.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="danger" size="sm" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="safety">
                    <Shield className="w-4 h-4 mr-1" />
                    Safety
                  </TabsTrigger>
                  <TabsTrigger value="community">
                    <Heart className="w-4 h-4 mr-1" />
                    Community
                  </TabsTrigger>
                  <TabsTrigger value="achievement">
                    <Award className="w-4 h-4 mr-1" />
                    Achievements
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </FadeIn>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Select Actions */}
          {filteredNotifications.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {selectedNotifications.size === 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAll}
                  >
                    Select All
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={deselectAll}
                  >
                    Deselect All
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {filteredNotifications.length} notification{filteredNotifications.length > 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Notifications List */}
          <StaggerChildren className="space-y-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                const isSelected = selectedNotifications.has(notification.id);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        'transition-all hover:shadow-md cursor-pointer',
                        !notification.read && 'border-l-4 border-l-purple-600 bg-purple-50/50',
                        isSelected && 'ring-2 ring-purple-500'
                      )}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="p-4">
                        <div className="flex gap-4">
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleSelectNotification(notification.id);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />

                          {/* Icon */}
                          <div className={cn('p-3 rounded-full flex-shrink-0', iconColor)}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-gray-900">
                                  {notification.title}
                                </h3>
                                {notification.priority === 'high' && (
                                  <Badge variant={getPriorityBadge(notification.priority).variant} size="sm">
                                    {getPriorityBadge(notification.priority).label}
                                  </Badge>
                                )}
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-gray-700 mb-2">{notification.message}</p>

                            <div className="flex items-center gap-3 text-sm">
                              {notification.businessName && (
                                <span className="text-purple-600 font-medium">
                                  {notification.businessName}
                                </span>
                              )}
                              {notification.userName && (
                                <div className="flex items-center gap-2">
                                  <Avatar
                                    src={notification.userAvatar}
                                    alt={notification.userName}
                                    size="sm"
                                  />
                                  <span className="text-gray-600">{notification.userName}</span>
                                </div>
                              )}
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-500">{notification.timestamp}</span>
                            </div>

                            {notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = notification.actionUrl!;
                                }}
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'unread'
                    ? "You're all caught up!"
                    : 'Check back later for updates'}
                </p>
              </div>
            )}
          </StaggerChildren>
        </div>
      </div>
    </PageTransition>
  );
}

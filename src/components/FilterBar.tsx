'use client'

import { useState } from 'react'
import { Heart, Accessibility, Brain, Shield, Users, Volume2, Eye } from 'lucide-react'

interface FilterBarProps {
  selectedFilters: string[]
  onFilterChange: (filters: string[]) => void
}

const filterCategories = [
  {
    title: 'Accessibility',
    filters: [
      { id: 'wheelchair-accessible', label: 'Wheelchair Accessible', icon: Accessibility, color: 'text-blue-600' },
      { id: 'sign-language', label: 'Sign Language Friendly', icon: Users, color: 'text-purple-600' },
      { id: 'audio-assistance', label: 'Audio Assistance', icon: Volume2, color: 'text-green-600' },
      { id: 'visual-assistance', label: 'Visual Assistance', icon: Eye, color: 'text-orange-600' }
    ]
  },
  {
    title: 'Identity & Community',
    filters: [
      { id: 'lgbtq-friendly', label: 'LGBTQ+ Friendly', icon: Heart, color: 'text-pink-600' },
      { id: 'religious-inclusive', label: 'Religious Inclusive', icon: Shield, color: 'text-indigo-600' },
      { id: 'cultural-diverse', label: 'Culturally Diverse', icon: Users, color: 'text-emerald-600' }
    ]
  },
  {
    title: 'Neurodiversity',
    filters: [
      { id: 'autism-friendly', label: 'Autism Friendly', icon: Brain, color: 'text-teal-600' },
      { id: 'quiet-space', label: 'Quiet Environment', icon: Shield, color: 'text-gray-600' },
      { id: 'sensory-friendly', label: 'Sensory Friendly', icon: Brain, color: 'text-cyan-600' }
    ]
  }
]

export default function FilterBar({ selectedFilters, onFilterChange }: FilterBarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Accessibility'])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId]
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    onFilterChange([])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {selectedFilters.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(filterId => {
              const filter = filterCategories
                .flatMap(cat => cat.filters)
                .find(f => f.id === filterId)
              if (!filter) return null
              
              const IconComponent = filter.icon
              
              return (
                <span
                  key={filterId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  <IconComponent className={`h-3 w-3 mr-1 ${filter.color}`} />
                  {filter.label}
                  <button
                    onClick={() => toggleFilter(filterId)}
                    className="ml-2 hover:text-primary-600"
                  >
                    ×
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filterCategories.map(category => (
          <div key={category.title} className="border-b border-gray-100 pb-4 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.title)}
              className="w-full flex justify-between items-center text-left py-2 hover:text-primary-600 transition-colors"
            >
              <span className="font-medium text-gray-900">{category.title}</span>
              <span className="text-gray-400">
                {expandedCategories.includes(category.title) ? '−' : '+'}
              </span>
            </button>
            
            {expandedCategories.includes(category.title) && (
              <div className="mt-3 space-y-2">
                {category.filters.map(filter => {
                  const IconComponent = filter.icon
                  return (
                    <label
                      key={filter.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => toggleFilter(filter.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <IconComponent className={`h-4 w-4 ${filter.color}`} />
                      <span className="text-sm text-gray-700">{filter.label}</span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

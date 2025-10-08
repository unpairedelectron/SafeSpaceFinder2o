'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [viewDate, setViewDate] = useState(value || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const previousMonth = () => {
    setViewDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1));
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(
      (d) =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!currentDate) return false;
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    if (!isDateDisabled(newDate)) {
      setCurrentDate(newDate);
      onChange?.(newDate);
    }
  };

  const days: (number | null)[] = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-4 shadow-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const date = new Date(year, month, day);
          const disabled = isDateDisabled(date);
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={cn(
                'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all',
                disabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'hover:bg-purple-50 cursor-pointer',
                today && !selected && 'bg-blue-50 text-blue-600 font-semibold',
                selected &&
                  'bg-purple-600 text-white hover:bg-purple-700 shadow-md',
                !selected && !today && !disabled && 'text-gray-900'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer with quick actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            setViewDate(today);
            onChange?.(today);
          }}
        >
          Today
        </Button>
        {currentDate && (
          <span className="text-sm text-gray-600">
            {currentDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        )}
      </div>
    </div>
  );
}

// DatePicker component that combines input with calendar
interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = value
    ? value.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between px-4 py-2.5 border rounded-lg bg-white text-left transition-colors',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent',
            !displayValue && 'text-gray-500'
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <span>{displayValue || placeholder}</span>
          </span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Calendar Dropdown */}
            <div className="absolute top-full left-0 mt-2 z-20">
              <Calendar
                value={value}
                onChange={(date) => {
                  onChange?.(date);
                  setIsOpen(false);
                }}
              />
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

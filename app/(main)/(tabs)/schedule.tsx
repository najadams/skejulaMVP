import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CalendarHeader } from "../../components/CalendarHeader";
import { CalendarDayCell } from "../../components/CalendarDayCell";
import { Schedule, DaySchedule } from "../../types/schedule";

export default function ScheduleScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // Mock tutors data - in a real app, this would come from an API
  const tutors = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Michael Brown" },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 weeks * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const getDaySchedules = (date: Date): DaySchedule => {
    const daySchedules = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.startDate);
      return (
        scheduleDate.getDate() === date.getDate() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getFullYear() === date.getFullYear()
      );
    });

    const busyness = Math.min(daySchedules.length / 5, 1); // Max 5 sessions per day

    return {
      date,
      schedules: daySchedules,
      busyness,
    };
  };

  const handleAddSchedule = (newSchedule: Omit<Schedule, "id">) => {
    const schedule: Schedule = {
      ...newSchedule,
      id: Date.now().toString(),
    };
    setSchedules((prev) => [...prev, schedule]);
  };

  const selectedDaySchedules = useMemo(() => {
    return getDaySchedules(selectedDate);
  }, [selectedDate, schedules]);

  const sortedSchedules = useMemo(() => {
    return [...schedules].sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }, [schedules]);

  const renderScheduleCard = (schedule: Schedule) => {
    const scheduleDate = new Date(schedule.startDate);
    const isToday = scheduleDate.toDateString() === new Date().toDateString();
    const isPast = scheduleDate < new Date();

    return (
      <TouchableOpacity
        key={schedule.id}
        style={[
          styles.scheduleCard,
          isPast && styles.pastSchedule,
          isToday && styles.todaySchedule,
        ]}>
        <View style={styles.scheduleHeader}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {scheduleDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Text style={styles.timeText}>{schedule.time}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  schedule.status === "confirmed" ? "#E8F5E9" : "#FFF3E0",
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    schedule.status === "confirmed" ? "#2E7D32" : "#F57C00",
                },
              ]}>
              {schedule.status === "confirmed" ? "Confirmed" : "Pending"}
            </Text>
          </View>
        </View>

        <Text style={styles.titleText}>{schedule.title}</Text>

        <View style={styles.footer}>
          <View style={styles.typeContainer}>
            <Ionicons
              name={schedule.type === "tutor" ? "person" : "hardware-chip"}
              size={16}
              color="#8E8E93"
            />
            <Text style={styles.typeText}>
              {schedule.type === "tutor"
                ? schedule.tutor
                : "AI Learning with Reaven"}
            </Text>
          </View>
          <Text style={styles.durationText}>{schedule.duration} minutes</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        {!isCalendarExpanded && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-schedule")}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.calendarToggle}
          onPress={() => setIsCalendarExpanded(!isCalendarExpanded)}>
          <Text style={styles.calendarToggleText}>
            {isCalendarExpanded ? "Hide Calendar" : "Show Calendar"}
          </Text>
          <Ionicons
            name={isCalendarExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#8E8E93"
          />
        </TouchableOpacity>

        {isCalendarExpanded && (
          <View style={styles.calendarSection}>
            <CalendarHeader
              date={selectedDate}
              onPreviousMonth={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setSelectedDate(newDate);
              }}
              onNextMonth={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setSelectedDate(newDate);
              }}
              onAddSchedule={() => router.push("/add-schedule")}
            />

            <View style={styles.daysGrid}>
              {getDaysInMonth(selectedDate).map((date, index) => (
                <CalendarDayCell
                  key={index}
                  date={date}
                  daySchedule={getDaySchedules(date)}
                  isCurrentMonth={date.getMonth() === selectedDate.getMonth()}
                  isToday={date.toDateString() === new Date().toDateString()}
                  onPress={() => setSelectedDate(date)}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.schedulesSection}>
          <Text style={styles.sectionTitle}>Upcoming Schedules</Text>
          {sortedSchedules.map(renderScheduleCard)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  calendarToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  calendarToggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  calendarSection: {
    backgroundColor: "#FFFFFF",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 8,
  },
  schedulesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pastSchedule: {
    opacity: 0.6,
  },
  todaySchedule: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  timeText: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  typeText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  durationText: {
    fontSize: 14,
    color: "#8E8E93",
  },
});

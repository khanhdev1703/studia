import { BookOpen, Home, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const studentItems = [
  {
    label: 'Trang chủ',
    path: '/student',
    icon: Home,
  },
  {
    label: 'Khóa học',
    path: '/student/courses',
    icon: BookOpen,
  },
  {
    label: 'Tôi',
    path: '/student/profile',
    icon: User,
  },
];

function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7E3F5] bg-[#FAF9FF]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-6">
        {studentItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex min-w-[64px] flex-col items-center justify-center gap-1"
            >
              {({ isActive }) => (
                <>
                  {/* Icon */}
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${isActive
                        ? 'bg-[#6C5CE7] text-white'
                        : 'text-[#858585]'
                      }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[11px] ${isActive
                        ? 'font-medium text-[#6C5CE7]'
                        : 'text-[#858585]'
                      }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;
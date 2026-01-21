import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('about')}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            这是一个基于 Next.js 和 Tailwind CSS 构建的移动端应用。
          </p>
          <p className="text-gray-600">
            我们致力于提供优秀的用户体验和现代化的界面设计。
          </p>
        </div>
      </div>
    </div>
  );
}

import { useTranslations } from 'next-intl';
import ApiDemo from '@/components/ApiDemo';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('greeting', { name: 'User' })}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            这是一个基于 Next.js 的移动端应用 (Multilingual)
          </p>
          
          <ApiDemo />
        </div>
      </div>
    </div>
  );
}

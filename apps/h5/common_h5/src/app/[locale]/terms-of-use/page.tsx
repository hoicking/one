import { useTranslations } from 'next-intl';

// 为国际化路由生成静态参数
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ];
}

// 配置 ISR，每 24 小时重新生成
export const revalidate = 86400;

export default function TermsOfUsePage() {
  const t = useTranslations('termsOfUse');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* 标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-lg font-semibold text-gray-600 mb-8">
              {t('lastUpdated')}
            </p>
          </div>

          {/* 介绍 */}
          <p className="text-gray-700 leading-relaxed">
            {t('introduction')}
          </p>

          {/* 1. 须知 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              1. {t('notice.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('notice.content')}
            </p>
          </section>

          {/* 2. 使用规则 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              2. {t('usageRules.title')}
            </h2>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              2.1 {t('usageRules.account.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('usageRules.account.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('usageRules.account.content2')}
            </p>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              2.2 {t('usageRules.restrictions.title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('usageRules.restrictions.content1')}
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('usageRules.restrictions.content2')}</li>
              <li>{t('usageRules.restrictions.content3')}</li>
              <li>{t('usageRules.restrictions.content4')}</li>
              <li>{t('usageRules.restrictions.content5')}</li>
              <li>{t('usageRules.restrictions.content6')}</li>
            </ul>
          </section>

          {/* 3. 双方的义务 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              3. {t('obligations.title')}
            </h2>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              3.1 {t('obligations.dunext.title')}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('obligations.dunext.content1')}</li>
              <li>{t('obligations.dunext.content2')}</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              3.2 {t('obligations.user.title')}
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('obligations.user.content1')}</li>
              <li>{t('obligations.user.content2')}</li>
              <li>{t('obligations.user.content3')}</li>
              <li>{t('obligations.user.content4')}</li>
            </ul>
          </section>

          {/* 4. 双方的权利 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              4. {t('rights.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('rights.dunext')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('rights.user')}
            </p>
          </section>

          {/* 5. 免责声明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              5. {t('disclaimer.title')}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('disclaimer.content1')}</li>
              <li>{t('disclaimer.content2')}</li>
              <li>{t('disclaimer.content3')}</li>
            </ul>
          </section>

          {/* 6. 变更声明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              6. {t('changes.title')}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('changes.content1')}</li>
              <li>{t('changes.content2')}</li>
            </ul>
          </section>

          {/* 7. 争议解决 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              7. {t('dispute.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('dispute.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

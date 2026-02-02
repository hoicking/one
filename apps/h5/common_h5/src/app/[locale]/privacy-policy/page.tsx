import { useTranslations } from 'next-intl';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ];
}

export const revalidate = 86400;

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy');

  const dataList = [
    {
      category: t('dataList.category1'),
      description: t('dataList.description1'),
      purpose: t('dataList.purpose1')
    },
    {
      category: t('dataList.category2'),
      description: t('dataList.description2'),
      purpose: t('dataList.purpose2')
    },
    {
      category: t('dataList.category3'),
      description: t('dataList.description3'),
      purpose: t('dataList.purpose3')
    },
    {
      category: t('dataList.category4'),
      description: t('dataList.description4'),
      purpose: t('dataList.purpose4')
    },
    {
      category: t('dataList.category5'),
      description: t('dataList.description5'),
      purpose: t('dataList.purpose5')
    },
    {
      category: t('dataList.category6'),
      description: t('dataList.description6'),
      purpose: t('dataList.purpose6')
    }
  ];

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
            {t('intro1')}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {t('intro2')}
          </p>

          {/* 目录 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              {t('tableOfContents')}
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('section1.title')}</li>
              <li>{t('section2.title')}</li>
              <li>{t('section3.title')}</li>
              <li>{t('section4.title')}</li>
              <li>{t('section5.title')}</li>
              <li>{t('section6.title')}</li>
              <li>{t('section7.title')}</li>
              <li>{t('section8.title')}</li>
              <li>{t('section9.title')}</li>
            </ol>
          </section>

          {/* 第1部分：个人数据收集与使用 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              1. {t('section1.title')}
            </h2>
            
            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              1.1 {t('section1.subsection1')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('section1.content1')}
            </p>
            
            <h4 className="font-bold text-gray-700 mt-6 mb-3">
              {t('section1.dataCollectionMethods')}
            </h4>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>{t('section1.userProvided')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.userProvidedContent')}</p>
              </li>
              <li>
                <strong>{t('section1.automaticallyCollected')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.automaticallyCollectedContent')}</p>
              </li>
              <li>
                <strong>{t('section1.thirdPartyData')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.thirdPartyDataContent')}</p>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              1.2 {t('section1.subsection2')}
            </h3>
            <h4 className="font-bold text-gray-700 mt-6 mb-3">
              {t('section1.dataUsagePurposes')}
            </h4>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>{t('section1.providingServices')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.providingServicesContent')}</p>
              </li>
              <li>
                <strong>{t('section1.marketing')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.marketingContent')}</p>
              </li>
              <li>
                <strong>{t('section1.improvingServices')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.improvingServicesContent')}</p>
              </li>
              <li>
                <strong>{t('section1.security')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.securityContent')}</p>
              </li>
              <li>
                <strong>{t('section1.legalCompliance')}</strong>
                <p className="text-gray-700 leading-relaxed">{t('section1.legalComplianceContent')}</p>
              </li>
            </ul>

            {/* 数据表格 */}
            <div className="mt-8 mb-8 overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left text-gray-700 font-semibold whitespace-nowrap" style={{ minWidth: '180px' }}>{t('dataList.categoryHeader')}</th>
                    <th className="py-4 px-6 text-left text-gray-700 font-semibold whitespace-nowrap" style={{ minWidth: '200px' }}>{t('dataList.descriptionHeader')}</th>
                    <th className="py-4 px-6 text-left text-gray-700 font-semibold whitespace-nowrap" style={{ minWidth: '300px' }}>{t('dataList.purposeHeader')}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((item, index) => (
                    <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150`}>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{item.category}</td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{item.description}</td>
                      <td className="py-4 px-6 text-gray-700">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-700 mt-8 mb-3">
              1.3 {t('section1.subsection3')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('section1.dataRetentionContent')}
            </p>
          </section>

          {/* 第2部分：Cookie及类似技术 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              2. {t('section2.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section2.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('section2.content2')}
            </p>
          </section>

          {/* 第3部分：个人数据披露 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              3. {t('section3.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section3.content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('section3.content2')}
            </p>
          </section>

          {/* 第4部分：个人数据访问与管控 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              4. {t('section4.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section4.content1')}
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>{t('section4.right1')}</li>
              <li>{t('section4.right2')}</li>
              <li>{t('section4.right3')}</li>
              <li>{t('section4.right4')}</li>
              <li>{t('section4.right5')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('section4.content2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('section4.content3')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('section4.content4')}
            </p>
          </section>

          {/* 第5部分：个人数据保护 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              5. {t('section5.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section5.content1')}
            </p>
          </section>

          {/* 第6部分：儿童个人数据处理 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              6. {t('section6.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section6.content1')}
            </p>
          </section>

          {/* 第7部分：个人数据的国际传输 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              7. {t('section7.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section7.content1')}
            </p>
          </section>

          {/* 第8部分：政策更新 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              8. {t('section8.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section8.content1')}
            </p>
          </section>

          {/* 第9部分：联系我们 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">
              9. {t('section9.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section9.content1')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

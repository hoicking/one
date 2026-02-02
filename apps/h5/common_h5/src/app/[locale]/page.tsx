'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { ChevronRight, MessageSquare, FileText, Shield, Globe } from 'lucide-react';

export default function Home() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  // 语言切换函数
  const switchLanguage = (newLocale: string) => {
    router.push('/', { locale: newLocale });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 语言切换器 */}
        <div className="flex justify-end mb-8">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow transition-shadow duration-300 border border-gray-100">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">
                {locale === 'zh' ? '中文' : 'English'}
              </span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              {locale !== 'zh' && (
                <button 
                  onClick={() => switchLanguage('zh')}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  中文
                </button>
              )}
              {locale !== 'en' && (
                <button 
                  onClick={() => switchLanguage('en')}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  English
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeIn">
            {commonT('greeting', { name: 'User' })}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>
        </div>
        
        {/* 功能卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* AI 聊天卡片 */}
          <Link href="/ai-chat" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="p-8">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {commonT('nav.aiChat')}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('cards.aiChat.description')}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300">
                  <span>{commonT('cards.aiChat.button')}</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* 使用条款卡片 */}
          <Link href="/terms-of-use" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="p-8">
                <div className="bg-green-100 text-green-600 p-4 rounded-xl inline-block mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {commonT('nav.termsOfUse')}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('cards.termsOfUse.description')}
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-800 transition-colors duration-300">
                  <span>{commonT('cards.viewDetails')}</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* 隐私政策卡片 */}
          <Link href="/privacy-policy" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="p-8">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-xl inline-block mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {commonT('nav.privacyPolicy')}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('cards.privacyPolicy.description')}
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors duration-300">
                  <span>{commonT('cards.viewDetails')}</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

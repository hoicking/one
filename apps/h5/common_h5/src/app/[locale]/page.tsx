'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { ChevronRight, MessageSquare, FileText, Shield, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemText } from '@mui/material';

export default function Home() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  // 语言菜单状态
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 语言切换函数
  const switchLanguage = (newLocale: string) => {
    router.push('/', { locale: newLocale });
    setAnchorEl(null);
  };

  // 菜单处理函数
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 语言切换器 */}
        <div className="flex justify-end gap-4 mb-8">
          {/* 语言切换器 - 使用Material UI */}
          <div>
            <Button
              onClick={handleMenuOpen}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Globe />}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              {locale === 'zh' ? '中文' : 'English'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {locale !== 'zh' && (
                <MenuItem onClick={() => switchLanguage('zh')}>
                  <ListItemText primary="中文" />
                </MenuItem>
              )}
              {locale !== 'en' && (
                <MenuItem onClick={() => switchLanguage('en')}>
                  <ListItemText primary="English" />
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
        
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeIn">
            {commonT('greeting', { name: 'User' })}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>
        </div>
        
        {/* 功能卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* AI 聊天卡片 */}
          <Link href="/ai-chat" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 p-4 rounded-xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {commonT('nav.aiChat')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400 p-4 rounded-xl inline-block mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {commonT('nav.termsOfUse')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 p-4 rounded-xl inline-block mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {commonT('nav.privacyPolicy')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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

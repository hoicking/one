export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">联系我们</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">邮箱</h2>
            <p className="text-gray-600">contact@example.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">电话</h2>
            <p className="text-gray-600">+86 123 4567 8900</p>
          </div>
        </div>
      </div>
    </div>
  );
}

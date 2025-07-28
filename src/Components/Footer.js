
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-4 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600">MNKart</span>. Developed with ❤️ by <span className="font-medium text-gray-700">Mayur Nandre</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer

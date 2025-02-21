import { Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 sm:p-6 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Minecraft 3D Models Showcase</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Your ultimate collection of custom Minecraft models</p>
          </div>
          <div>
            <a 
              href="mailto:contact@minecraft-models.com" 
              className="flex items-center text-gray-300 hover:text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              contact@minecraft-models.com
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Minecraft Models Showcase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
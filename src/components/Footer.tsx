
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="journal-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-journal-blue">ArticleBeacon</h3>
            <p className="text-sm text-gray-600">
              A platform for academic research submission and publication. 
              Connect with the global research community.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-journal-blue mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Author Guidelines</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Review Process</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Publication Ethics</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Copyright Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-journal-blue mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Journal Indexing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Article Processing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Peer Review</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Digital Archiving</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-journal-blue mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Contact</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-journal-blue">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ArticleBeacon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

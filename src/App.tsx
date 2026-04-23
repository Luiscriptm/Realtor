import { Route, Routes } from 'react-router-dom';
import MobileDemo from './screens/_demo/MobileDemo';
import ComponentGallery from './screens/_gallery/ComponentGallery';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MobileDemo />} />
      <Route path="/_gallery" element={<ComponentGallery />} />
    </Routes>
  );
}

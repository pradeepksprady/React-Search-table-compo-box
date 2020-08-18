import React from 'react';
import './App.css';
import './assets/css/fontello.css';
import MultiColumnCompoTableList from  './multi-table-compo-list/multi-table-compo-list.component'
  
function App() {
  const listVal =[{ id: 1, country: 'Luxembourg', lan: 57825, lat: 563, area: 102708 },
        { id: 2, country: '   mnbv', lan: 664005, lat: 8238, area: 80602 },
        { id: 3, country: 'Norway', lan: 388315, lat: 5205, area: 74604 },
        { id: 4, country: 'Macao', lan: 46178, lat: 647, area: 71372 },
        { id: 5, country: 'Qatar', lan: 166908, lat: 2421, area: 68941 },
        { id: 6, country: 'Ireland', lan: 283716, lat: 4635, area: 61211 },
        { id: 7, country: 'United States', lan: 371, lat: 321601, area: 56083 },
        { id: 8, country: 'Singapore', lan: 292734, lat: 5535, area: 52887 }];
  const element =  <div>
    <MultiColumnCompoTableList List={listVal} />
  </div>
    
  return (
    element
  );
}
export default App;

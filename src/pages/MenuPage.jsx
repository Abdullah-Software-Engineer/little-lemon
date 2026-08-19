const menu = [
  { name: 'Greek Salad', price: '$12.99' },
  { name: 'Bruschetta', price: '$8.99' },
  { name: 'Grilled Fish', price: '$19.99' },
  { name: 'Pasta', price: '$16.50' },
  { name: 'Lemon Dessert', price: '$6.50' },
]

export default function MenuPage() {
  return (
    <main id="main-content" className="simple-page">
      <div className="container">
        <h1 className="page-title">Menu</h1>
        <p>A rotating selection of Mediterranean plates, with weekly specials.</p>
        <ul className="menu-list">
          {menu.map((item) => (
            <li className="menu-item" key={item.name}>
              <span>{item.name}</span>
              <span className="price">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

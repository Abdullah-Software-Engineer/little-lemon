import { Link } from 'react-router-dom'

const specials = [
  {
    name: 'Greek Salad',
    price: '$12.99',
    emoji: '🥗',
    description:
      'Crisp lettuce, peppers, olives, and Chicago-style feta, finished with garlic and rosemary croutons.',
    background: '#cfe3c8',
  },
  {
    name: 'Bruschetta',
    price: '$8.99',
    emoji: '🍞',
    description:
      'Grilled bread coated with garlic, seasoned with salt and olive oil, then topped with ripe tomatoes.',
    background: '#f4d7b5',
  },
  {
    name: 'Lemon Dessert',
    price: '$6.50',
    emoji: '🍋',
    description:
      "A house favorite from grandma's recipe book, made with the freshest citrus and a hint of vanilla.",
    background: '#f7e38a',
  },
]

export default function Specials() {
  return (
    <section className="section" aria-labelledby="specials-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="specials-heading">This week’s specials</h2>
          <Link className="btn btn-primary" to="/menu">
            Online menu
          </Link>
        </div>
        <div className="cards">
          {specials.map((item) => (
            <article className="card" key={item.name}>
              <div className="card-media" style={{ background: item.background }} aria-hidden="true">
                {item.emoji}
              </div>
              <div className="card-body">
                <div className="card-title-row">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price}</p>
                </div>
                <p>{item.description}</p>
                <Link className="order-link" to="/order">
                  Order a delivery
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const categories = ['All', 'Meat Lovers', 'Vegetarian', 'Grilled', 'Spicy', 'Calzone'];

const Categories = ({ categoryId, setCategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setCategoryId(i);
              }}
              className={categoryId === i ? 'active' : ''}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

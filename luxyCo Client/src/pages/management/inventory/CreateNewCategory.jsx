import '../../../sass/management/inventory/_createNewInventoryCategory.scss';

const CreateNewCategory = () => {
  return (
    <div className="createNewCategory">
      <p>Create New Category</p>

      <input type="text" required />
      <button>crete category</button>
    </div>
  );
};

export default CreateNewCategory;

import React, { useState } from 'react';

interface Dog {
  id: number;
  name: string;
  breed: string;
  photo: string;
}

const DogggieApp = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [newDog, setNewDog] = useState<Dog>({
    id: dogs.length + 1,
    name: '',
    breed: '',
    photo: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDog({ ...newDog, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setDogs([...dogs, { ...newDog, photo: reader.result as string }]);
        setNewDog({
          id: dogs.length + 2,
          name: '',
          breed: '',
          photo: '',
        });
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">DogggieApp</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newDog.name}
          onChange={handleInputChange}
          placeholder="Dog's name"
          className="block w-full p-2 mb-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          name="breed"
          value={newDog.breed}
          onChange={handleInputChange}
          placeholder="Dog's breed"
          className="block w-full p-2 mb-2 border border-gray-400 rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full p-2 mb-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Dog
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Dog Gallery</h2>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id} className="mb-4">
              <img
                src={dog.photo}
                alt={dog.name}
                className="w-full h-64 object-cover mb-2"
              />
              <h3 className="text-lg font-bold mb-1">{dog.name}</h3>
              <p className="text-gray-600">{dog.breed}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DogggieApp;
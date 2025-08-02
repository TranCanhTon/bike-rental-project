export interface Bike {
  _id: string;
  name: string;
  type: string;
  hourlyRate: number;
  description: string;
  image: string;
  location: string;
  isAvailable: boolean;
  averageRating: number;
  numOfReviews: number;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  reviews: [
    {
      _id: string;
      rating: number;
      title: string;
      comment: string;
      user: {
        _id: string;
        name: string;
      };
      updatedAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

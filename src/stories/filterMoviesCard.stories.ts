import type { Meta, StoryObj } from '@storybook/react';
import FilterMoviesCard from "../components/filterMoviesCard";
import { FilterOption } from "../types/interfaces"; // Import your types if needed

const meta = {
  title: 'Home Page/FilterMoviesCard',
  component: FilterMoviesCard,
} satisfies Meta<typeof FilterMoviesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onUserInput: (f: FilterOption, s: string) => {
      console.log(f, s); // You can replace this with any mock function you want
    },
    titleFilter: "",
    genreFilter: "0",
  },
};

Basic.storyName = "Default";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BellElectric, Home, Shirt } from 'lucide-react';
import { MultiSelectFilter } from './MultiSelect';

const Filters = () => {
    return (<div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="newest" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
            </Select>
            <MultiSelectFilter options={[
                {
                    label: "Electronics",
                    value: "electronics",
                    icon: BellElectric
                },
                {
                    label: "Home",
                    value: "home",
                    icon: Home
                },
                {
                    label: "Fashion",
                    value: "fashion",
                    icon: Shirt
                },
            ]} selectedValues={new Set(["home"])} onSelect={(val) => console.log(val)} />
        </div>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue defaultValue={"newest"} placeholder="newest" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
        </Select>
    </div>)
}

export default Filters;

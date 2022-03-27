type Props = {
    placeholder?: string,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => any,
    value?: string,
    clearSearch?: () => any,
}

const SearchField: React.FC<Props> = ({placeholder, value, onChange, clearSearch}) => {
    return (
        <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {value?
                <i className="ri-close-circle-fill text-gray-400 text-xl cursor-pointer" onClick={clearSearch} />
                :
                <i className="ri-search-2-line text-gray-400 text-xl" />
                }
            </span>
            <input className="placeholder-gray-400 block bg-white w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1" 
                type="text" name="search" value={value || ''} onChange={onChange} placeholder={placeholder || "Search for anything..."} autoComplete="off"
            />
        </label>
    )
}

export default SearchField
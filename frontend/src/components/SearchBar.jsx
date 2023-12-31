import { Box, colors, InputBase, IconButton, TextField } from "@mui/material";
import { FC, useContext, useMemo, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";

const SearchBar = () => {
	const [searchString, setSearchString] = useState('');
	const theme = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const [focus, setFocus] = useState(false);
	return (
		<Box
			display="flex"
		>
			<InputBase
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				sx={{ ml: 2, flex: 1 }}
				placeholder="Search products"
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
			/>
			{/* <TextField size='small' placeholder="Search" value={searchString} variant="outlined" /> */}
			<IconButton type="button" sx={{ p: 1 }}>
				<SearchIcon />
			</IconButton>
		</Box>
	);
};

export default SearchBar;

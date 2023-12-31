import { useTheme } from "@emotion/react";
import { FC, useContext, useMemo } from "react";
import { ColorModeContext, tokens } from "../contexts/theme";

import { Box, IconButton, Typography } from "@mui/material";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import { useActiveNav } from "../hooks/useActiveNav";
import { AuthContext } from "../contexts/auth";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const AppNavBar = (props) => {
	const theme = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const colorMode = useContext(ColorModeContext);
	const activeNav = useActiveNav();
	const { auth } = useContext(AuthContext);

	const navLinks = useMemo(
		() => [
			{ label: "Home", href: "/home", disabled: false },
			...(auth.user?.role === "staff-admin-role"
				? [
						{ label: "User", href: "/user", disabled: false },
						{ label: "Analytics", href: "/analytics", disabled: false },
				  ]
				: []),
		],
		[auth]
	);

	return (
		<Box
			display="flex"
			p={2}
			position="sticky"
			top={0}
			sx={{ backgroundColor: colors.bg[100] }}
			zIndex={11}
			boxShadow={1}
			alignItems={"center"}
		>
			<Link to={"/home"} style={{textDecoration: "none", textAlign: "center", color: colors.primary[900]}}>
				{" "}
				<Typography variant="h3" fontFamily={"cursive"} fontWeight={650}>
					MyTaskManager
				</Typography>
			</Link>
			{/* <Box>
				{navLinks.map((link, index) => (
					<Link
						key={`link-${index}`}
						style={{
							pointerEvents: link.disabled ? "none" : "all",
							fontWeight: activeNav.href == link.href ? "600" : "400",
							margin: "0 10px 0 10px",
						}}
						to={link.href}
						aria-disabled={link.disabled}
					>
						{link.label}
					</Link>
				))}
			</Box> */}
			<Box display="flex" marginLeft={"auto"}>
				<IconButton onClick={colorMode.toggleColorMode} sx={{marginRight: 1}}>
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				{props.profile && <UserDropdown />}
			</Box>
		</Box>
	);
};

export default AppNavBar;

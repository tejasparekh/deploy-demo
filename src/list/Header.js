import React from "react";
import {
    AppBar,
    Toolbar,
    Container,
    InputBase,
    makeStyles,
    fade
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from "throttle-debounce";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme
            .transitions
            .create('width'),
        width: '100%',
        [
            theme
                .breakpoints
                .up('md')
        ]: {
            width: '20ch'
        }
    }
}));

function Header(props) {
    const classes = useStyles();

    const searchFn = debounce(500, props.onSearch);

    const onSearch = (text) => {
        searchFn(text.trim());
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            onChange={(event) => onSearch(event.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{
                                'aria-label': 'search'
                            }}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
import React, {useState, useEffect, useRef} from "react";
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from "@material-ui/core";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroll-component";

function List() {

    const [questions,
        setQuestions] = useState([]);
    const [hasMore,
        setHasMore] = useState(false);
    const [open,
        setOpen] = useState(false);
    const [question,
        setQuestion] = useState({});
    const page = useRef(1);
    const searchText = useRef('');

    useEffect(() => {
        getQuestions();
    }, []);

    async function getQuestions() {
        var response;
        if (searchText.current.length === 0) {
            response = await fetch('https://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=st' +
                    'ackoverflow&page=' + page.current++ + '&pagesize=100&order=desc&sort=creation&filter=default');
        } else {
            response = await fetch('https://api.stackexchange.com/2.2/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stack' +
                    'overflow&page=' + page.current++ + '&pagesize=100&order=desc&sort=creation&intitle=' + encodeURI(searchText.current) + '&filter=default');
        }
        const questionsPage = await response.json();
        setHasMore(questionsPage.has_more);
        const allQuestions = (page.current === 2) ? questionsPage.items : questions.concat(questionsPage.items);
        setQuestions(allQuestions);
    }

    const rowClick = (event, question) => {
        setQuestion(question);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setQuestion({});
    }

    const onSearch = (text) => {
        searchText.current = text;
        page.current = 1;
        getQuestions();
    }

    const dateRenderer = (seconds) => {
        var d = new Date(0);
        d.setUTCSeconds(seconds);
        return d.toLocaleString();
    }

    return (
        <React.Fragment>
            <InfiniteScroll
                dataLength={questions.length}
                hasMore={hasMore}
                next={getQuestions}>
                <Header onSearch={onSearch} />
                <Container maxWidth="lg">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Title</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>Author</b>
                                    </TableCell>
                                    <TableCell width="200">
                                        <b>Creation date</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map((question, index) => (
                                    <TableRow key={index} onClick={(event) => rowClick(event, question)}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            dangerouslySetInnerHTML={{
                                            __html: question.title
                                        }}/>
                                        <TableCell
                                            dangerouslySetInnerHTML={{
                                            __html: question.owner.display_name
                                        }}/>
                                        <TableCell>{dateRenderer(question.creation_date)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </InfiniteScroll>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <span
                        dangerouslySetInnerHTML={{
                        __html: question.title
                    }}/>
                </DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        autoFocus
                        href={question.link}
                        target="_blank">
                        View
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default List;
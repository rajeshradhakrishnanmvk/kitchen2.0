import { Container, Pagination } from "semantic-ui-react";
import { useRouter } from 'next/router'

function ProductPagination({ totalPages }) {
  const router = useRouter()

  return (
    <Container textAlign="center" style={{ margine: '2em' }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(event, data) => {
          //console.log(data);
          data.activePage === 1
            ? router.push("/")
            : router.push(`/?page=${data.activePage}`);
        }}
      />
    </Container>
  );
}

export default ProductPagination;

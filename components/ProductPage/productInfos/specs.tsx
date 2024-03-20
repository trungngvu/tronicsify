import CollapsibleDiv from "../CollapsibleDiv";

const Specs = ({ product }: any) => {
  return (
    <CollapsibleDiv>
      <div className="flex gap-16 md:mx-20 md:flex-row">
        <div className="w-[70%]">
          <div className="py-5 text-2xl border-b-2">Mô tả sản phẩm</div>
          <div
            className="py-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className="grow-[1]">
          <div className="py-5 text-2xl border-b-2">Thông số kỹ thuật</div>
          <div className="py-3">
            <table dangerouslySetInnerHTML={{ __html: product.long_specs }} />
          </div>
        </div>
      </div>
    </CollapsibleDiv>
  );
};

export default Specs;

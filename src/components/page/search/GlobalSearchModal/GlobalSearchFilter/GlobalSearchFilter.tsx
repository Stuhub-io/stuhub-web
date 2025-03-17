import { PageFileTypeSelector, PageViewTypeOptions } from "@/components/page/common/PageViewTypeDropdown"
import { ButtonGroup, Button, Selection } from "@nextui-org/react"
import { RiFilterFill, RiCloseLine, RiCalendarLine, RiArrowDownSLine } from "react-icons/ri"

interface GlobalSearchFilterProps {
    typeFilter: Selection,
    setTypeFilter: (type: Selection) => void
    isOpen?: boolean
}

export const GlobalSearchFilter = (props: GlobalSearchFilterProps) => {
    const { typeFilter, setTypeFilter, isOpen } = props
    
    if (!isOpen) return

    return (
        <div className="flex items-center gap-3 px-3 py-2">
            <ButtonGroup>
            <PageFileTypeSelector selectedKeys={typeFilter} onSelectionChange={setTypeFilter} selectionMode="single">
              <Button
                size="sm"
                variant="flat"
                startContent={
                  typeFilter !== 'all' ? (
                    PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.icon
                  ) : (
                    <RiFilterFill size={16} />
                  )
                }
              >
                {typeFilter === 'all'
                  ? 'Type'
                  : PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.label}
              </Button>
            </PageFileTypeSelector>
            {typeFilter !== 'all' && (
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                onClick={() => {
                  setTypeFilter('all')
                }}
              >
                <RiCloseLine size={16} />
              </Button>
            )}
          </ButtonGroup>
          <Button startContent={<RiCalendarLine size={16} />} size="sm" endContent={<RiArrowDownSLine size={16} />} variant="flat">
            Modified
          </Button>

        </div>
    )
}
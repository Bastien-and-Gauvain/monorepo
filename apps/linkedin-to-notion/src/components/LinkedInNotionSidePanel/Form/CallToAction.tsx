import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { ButtonIcon, ButtonPrimary } from 'design-system';

export const CallToAction = ({
  hasNotionValues,
  isDisplayingNotionValues,
  updateHandler,
  isUpdating,
  saveHandler,
  isSaving,
  reloadHandler,
  isReloading,
}: {
  hasNotionValues: boolean;
  isDisplayingNotionValues: boolean;
  updateHandler: () => void;
  isUpdating: boolean;
  saveHandler: () => void;
  isSaving: boolean;
  reloadHandler: () => void;
  isReloading: boolean;
}) => {
  return (
    <div className="plasmo-flex plasmo-space-x-2 plasmo-items-center plasmo-w-full plasmo-fixed plasmo-bottom-0 plasmo-left-0 plasmo-px-4 plasmo-pb-4 plasmo-pt-2 plasmo-bg-background-light">
      {hasNotionValues ? (
        <ButtonPrimary onClick={updateHandler} isLoading={isUpdating}>
          Update Notion
        </ButtonPrimary>
      ) : (
        <ButtonPrimary onClick={saveHandler} isLoading={isSaving}>
          Save
        </ButtonPrimary>
      )}
      {!isDisplayingNotionValues && (
        <ButtonIcon onClick={reloadHandler} isLoading={isReloading}>
          <ArrowPathIcon className="plasmo-text-white plasmo-w-5 plasmo-h-5" />
        </ButtonIcon>
      )}
    </div>
  );
};

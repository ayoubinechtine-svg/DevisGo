import { useI18n } from '../contexts/I18nContext';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  body?: string;
}

export default function ConfirmDialog({ open, onConfirm, onCancel, title, body }: Props) {
  const { t } = useI18n();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-5">
        <h3 className="mb-1.5 font-medium text-ink">{title ?? t.common.confirmDeleteTitle}</h3>
        <p className="mb-5 text-sm text-ink/60">{body ?? t.common.confirmDeleteBody}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn-secondary">{t.common.cancel}</button>
          <button onClick={onConfirm} className="rounded-card bg-alert px-5 py-2.5 text-sm font-medium text-white hover:bg-alert/90">
            {t.common.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

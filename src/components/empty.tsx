import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "250px",
        mt: 4,
        px: 2,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        textAlign: "center",
      }}
    >
      {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}

      <Typography
        variant="h6"
        sx={{ color: "text.secondary", fontStyle: "italic", mb: 1 }}
      >
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {description}
        </Typography>
      )}

      {action && <Box>{action}</Box>}
    </Box>
  );
};
